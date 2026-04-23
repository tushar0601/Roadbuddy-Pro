"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import { Download, Loader2, QrCode } from "lucide-react";
import { toast } from "sonner";

import { useSticker } from "@/hooks/use-sticker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StickerGenerator() {
  const { createSticker, createStickerPending, createdSticker } = useSticker();
  const qrRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    try {
      await createSticker();
      toast.success("Sticker generated");
    } catch {
      toast.error("Failed to generate sticker");
    }
  };

  const downloadJpeg = async () => {
    if (!qrRef.current || !createdSticker) return;

    try {
      const dataUrl = await toJpeg(qrRef.current, {
        quality: 0.95,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `roadbuddy-${createdSticker.public_code}.jpeg`;
      link.href = dataUrl;
      link.click();
    } catch {
      toast.error("Failed to download JPEG");
    }
  };

  const downloadPdf = async () => {
    if (!qrRef.current || !createdSticker) return;

    try {
      const dataUrl = await toJpeg(qrRef.current, {
        quality: 0.95,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      pdf.text("RoadBuddy Sticker", 20, 20);
      pdf.addImage(dataUrl, "JPEG", 20, 30, 80, 80);
      pdf.save(`roadbuddy-${createdSticker.public_code}.pdf`);
    } catch {
      toast.error("Failed to download PDF");
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
      <Card className="rounded-3xl border border-slate-800 bg-slate-900 text-slate-100 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Create Sticker</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-slate-400">
            Generate a new QR sticker for a vehicle owner and export it for
            print or sharing.
          </p>

          <div className="space-y-3">
            <Button
              onClick={handleGenerate}
              disabled={createStickerPending}
              className="h-11 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-500"
            >
              {createStickerPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate Sticker
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={downloadJpeg}
              disabled={!createdSticker}
              className="h-11 w-full rounded-xl bg-slate-800 text-slate-100 hover:bg-slate-700 disabled:bg-slate-800/60 disabled:text-slate-500"
            >
              <Download className="mr-2 h-4 w-4" />
              Download JPEG
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={downloadPdf}
              disabled={!createdSticker}
              className="h-11 w-full rounded-xl bg-slate-800 text-slate-100 hover:bg-slate-700 disabled:bg-slate-800/60 disabled:text-slate-500"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>

          {!createdSticker && (
            <p className="text-xs text-slate-500">
              Generate a sticker first to enable downloads.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-3xl border border-slate-800 bg-slate-900 text-slate-100 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Sticker Preview</CardTitle>
        </CardHeader>

        <CardContent>
          {createdSticker ? (
            <div className="flex justify-center">
              <div
                ref={qrRef}
                className="w-full max-w-[320px] rounded-3xl bg-white p-5 text-center shadow-md sm:p-6"
              >
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  RoadBuddy
                </h2>

                <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                  Scan to contact owner
                </p>

                <div className="mt-4 flex justify-center">
                  <QRCodeCanvas
                    value={createdSticker.qr_value}
                    size={200}
                    includeMargin
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-800">
                  Code: {createdSticker.public_code}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-950/40">
              <div className="text-center">
                <QrCode className="mx-auto h-10 w-10 text-slate-700" />
                <p className="mt-3 text-sm text-slate-400">
                  Generate a sticker to preview the QR code here.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
