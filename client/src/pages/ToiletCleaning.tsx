import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import toiletCleaningImg from "../assets/toilet-cleaning.png";

export default function ToiletCleaning() {
  const steps = [
    "便器の内側を、専用のブラシとトイレマジックリンを使い汚れを落とす。(画像①)",
    "便器の外側、便座の上、便蓋、タンクをおしぼりを使って拭く。(画像②)",
    "鏡をアルカリ電解水とペーパータオルを使って拭く。(画像③)",
    "蛇口付近の汚れやほこりを拭く。(画像④)",
    "トイレットペーパー上のボタンと、扉の取っ手を拭く。(画像⑤)",
    "床の排水に水を流す。",
    "ペーパータオル、トイレットペーパーの補充。",
    "芳香剤の残量の確認。無ければテーブルのソファの下にあります。最後の１個を取った方は社員に一報お願いします。(画像⑥)"
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-slate-800">トイレ掃除マニュアル</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Introduction */}
        <section className="mb-8">
          <p className="text-slate-600 leading-relaxed">
            トイレ掃除の手順です。画像と照らし合わせながら、順番に作業を進めてください。
          </p>
        </section>

        {/* Image Reference */}
        <section className="mb-8">
          <Card className="overflow-hidden border-none shadow-md">
            <img 
              src={toiletCleaningImg} 
              alt="トイレ掃除の参考画像" 
              className="w-full h-auto object-cover"
            />
          </Card>
        </section>

        {/* Cleaning Steps */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
            掃除手順
          </h2>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="p-4 flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{step}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Note */}
        <section className="mb-8">
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <p className="text-amber-800 font-medium text-center">
                物の場所等分からないことがあれば、その都度聞いてください。
              </p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
