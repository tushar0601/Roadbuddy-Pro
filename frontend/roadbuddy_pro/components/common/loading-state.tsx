import { Loader2 } from "lucide-react";

export function LoadingState({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 rounded-full border border-slate-800 bg-slate-900 p-3">
        <Loader2 className="h-5 w-5 animate-spin text-slate-300" />
      </div>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}