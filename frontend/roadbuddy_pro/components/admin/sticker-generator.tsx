"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import { Download, Loader2, QrCode } from "lucide-react";
import { toast } from "sonner";

import { useSticker } from "@/hooks/use-sticker";
import { Button } from "@/components/ui/button";

export function StickerGenerator() {
  const { createSticker, createStickerPending, createdSticker } = useSticker();
  const qrRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    try {
      await createSticker();
      toast.success("Sticker generated");
    } catch {
      toast.error("Failed to generate");
    }
  };

  const downloadJpeg = async () => {
    if (!qrRef.current) return;

    const dataUrl = await toJpeg(qrRef.current, {
      quality: 0.95,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = "roadbuddy-sticker.jpeg";
    link.href = dataUrl;
    link.click();
  };

  const downloadPdf = async () => {
    if (!qrRef.current) return;

    const dataUrl = await toJpeg(qrRef.current);

    const pdf = new jsPDF();
    pdf.addImage(dataUrl, "JPEG", 15, 40, 180, 180);
    pdf.save("roadbuddy-sticker.pdf");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-100">Create Sticker</h3>
        <p className="mt-2 text-sm text-slate-400">
          Generate a QR sticker and download it for printing or sharing.
        </p>

        <div className="mt-6 space-y-3">
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
          <p className="mt-4 text-xs text-slate-500">
            Generate a sticker first to enable downloads.
          </p>
        )}
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex justify-center items-center">
        {createdSticker ? (
          <div
            ref={qrRef}
            className="bg-white text-black rounded-3xl p-6 text-center"
          >
            <h2 className="text-xl font-bold mb-2">RoadBuddy</h2>

            <p className="text-xs text-gray-600 mb-4">
              Scan to contact vehicle owner
            </p>

            <QRCodeCanvas value={createdSticker.qr_value} size={220} />

            <p className="mt-4 text-sm font-medium">
              Code: {createdSticker.public_code}
            </p>
          </div>
        ) : (
          <p className="text-slate-500">Generate a sticker to preview QR</p>
        )}
      </div>
    </div>
  );
}
