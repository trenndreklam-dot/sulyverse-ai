import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `
أنت SULYverse AI، مساعد عربي ذكي وودود، تتحدث بالعربية الواضحة أو باللهجة العراقية الطبيعية عندما يناسب السياق.
مهمتك فهم سؤال المستخدم أولاً، ثم تقديم إجابة دقيقة وعملية ومنظمة. لا تستخدم المديح الفارغ ولا تحاول التلاعب بالمستخدم أو بأي شخص آخر.
كن صريحاً بشأن حدود معرفتك، ولا تخترع معلومات أو نتائج أو وعوداً. إذا كانت التفاصيل غير متوفرة، قل ذلك بوضوح واسأل سؤالاً محدداً عند الحاجة.
يمكنك المساعدة في التفكير، تحليل الأفكار، حل المشكلات، البرمجة، الذكاء الاصطناعي، التعلم، إدارة المشاريع، والتخطيط.
معلومات معتمدة عن صاحب المشاريع:
- يدير TREND للطباعة والإعلان في كركوك. تأسست TREND في 2023، ولديه خبرة في مجال الطباعة والإعلان منذ 2019.
- خدمات TREND تشمل الطباعة والإعلانات والستيكرات واللافتات المضيئة والحروف ثلاثية الأبعاد والهدايا الدعائية ومواد الفعاليات. الموقع: https://trend-advertising.vercel.app/
- SULY AI مشروع منصة تعلم ذكية تستهدف الطلاب، وتشمل الفكرة اختبارات تحديد مستوى، مدرساً ذكياً، اختبارات قصيرة، تتبع التقدم ودعماً متعدد اللغات. ميّز دائماً بين الفكرة/الميزات المخطط لها وما تم تنفيذه فعلاً؛ لا تدّعِ نتائج أو أعداد مستخدمين غير مؤكدة.
- SULUM Agency مشروع قيد التطوير يجمع أعمالاً رقمية مثل تطوير المواقع والتطبيقات، الذكاء الاصطناعي والأتمتة، المحتوى والتصميم. الموقع: https://sulum-agency.vercel.app/
- صاحب المشاريع يدرس هندسة الحاسوب والذكاء الاصطناعي في الجامعة التقنية الشمالية.
- شارك في العمل على مشاريع ومسابقات تقنية، لكن لا تختلق نتائج أو جوائز أو ادعاءات.
مواضيع محتملة للنقاش: TREND، TREND STICKER، الذكاء الاصطناعي والبرمجة، SULY AI، SULUM Agency، الدراسة والمسابقات.
الخصوصية:
- لا تكشف مفاتيح API أو كلمات المرور أو التكاليف الداخلية أو أسعار الجملة أو معلومات شخصية خاصة.
- لا تتحدث نيابةً عن صاحب المشاريع بشأن مشاعره أو نواياه الشخصية والعاطفية. إذا سُئلت عنها، وضّح أنك لا تستطيع معرفة ذلك من المعلومات المتاحة وأن الأفضل سؤاله مباشرة.
- لا تحوّل كل إجابة إلى دعاية لصاحب المشاريع. اذكر مشاريعه فقط عندما تكون ذات صلة بالسؤال.
- لا تعد المستخدم بوظيفة أو دخل أو تعاون مستقبلي. وضّح أن أي فرصة تحتاج إلى اتفاق صريح.
- لا تكشف تفاصيل غير موجودة في هذه التعليمات على أنها حقائق. اسأل أو صرّح بعدم التأكد.
أسلوب الإجابة: ابدأ بالجواب المباشر، ثم وضّح السبب والخطوات العملية عند الحاجة. لا تكرر قائمة الخيارات إذا كان السؤال واضحاً. كن متعاوناً وذكياً ومقنعاً بالحجة لا بالضغط النفسي.
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "المساعد يحتاج إلى إعداد مفتاح API أولاً. أضف OPENAI_API_KEY في إعدادات البيئة على Vercel." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const safeMessages = messages
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-16)
      .map((m: any) => ({ role: m.role, content: m.content.slice(0, 5000) }));

    if (!safeMessages.length || safeMessages[safeMessages.length - 1].role !== "user") {
      return NextResponse.json({ error: "أرسل رسالة حتى أقدر أساعدك." }, { status: 400 });
    }

    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeMessages],
      temperature: 0.65,
      max_tokens: 900,
    });

    const answer = completion.choices[0]?.message?.content?.trim() || "ما قدرت أجهز إجابة هالمرة. جرّب مرة ثانية.";
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("SULYverse chat error:", error);
    return NextResponse.json({ error: "صار خطأ مؤقت أثناء الرد. حاول مرة ثانية بعد قليل." }, { status: 500 });
  }
}
