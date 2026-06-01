import { NextRequest, NextResponse } from 'next/server';

/* ── Lazy-load MongoDB so missing URI doesn't crash the build ── */
async function getCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set in .env.local');

  const { default: clientPromise } = await import('@/lib/mongodb');
  const { DB_NAME }               = await import('@/lib/mongodb');
  const client = await clientPromise;
  return client.db(DB_NAME).collection('messages');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ success:false, error:'Message is required' }, { status:400 });
    }

    const col = await getCollection();
    const doc = {
      name:      (name?.trim()  || 'Anonymous').slice(0,120),
      email:     (email?.trim() || '').slice(0,200),
      message:   message.trim().slice(0,2000),
      timestamp: new Date(),
      read:      false,
    };

    const result = await col.insertOne(doc);
    console.log('[messages] Saved:', result.insertedId.toString());

    return NextResponse.json({ success:true, id: result.insertedId.toString() });

  } catch (err: any) {
    /* Return the real error so you can debug it */
    console.error('[messages] Error:', err.message);
    return NextResponse.json(
      { success:false, error: err.message ?? 'Unknown error' },
      { status:500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error:'Unauthorised' }, { status:401 });
  }
  try {
    const col  = await getCollection();
    const msgs = await col.find({}).sort({ timestamp:-1 }).limit(50).toArray();
    return NextResponse.json({ success:true, count: msgs.length, messages: msgs });
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status:500 });
  }
}
