"use client";
import {  Send, Loader } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInputSearchProps {
    onSubmit: (value: string) => void;
    isLoading?: boolean;
}

export default function AI_Input_Search({ onSubmit, isLoading }: AIInputSearchProps) {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 44,
        maxHeight: 200,
    });

    const handleSubmit = () => {
        if (isLoading || !value.trim()) return;
        onSubmit(value);
        setValue("");
        adjustHeight(true);
    };

    const handleContainerClick = () => {
        textareaRef.current?.focus();
    };

    const hasContent = value.trim().length > 0;

    return (
        <div className="mb-10 w-full">
            <div
                className={cn(
                    "relative rounded-xl transition-all duration-200 ease-out",
                    "bg-black/3 dark:bg-white/3",
                    "border border-black/8 dark:border-white/8",
                    isFocused ? "border-black/15 dark:border-white/15 shadow-sm dark:shadow-black/20" : "",
                    "hover:border-black/10 dark:hover:border-white/10"
                )}
                onClick={handleContainerClick}
                role="textbox"
                tabIndex={0}
                aria-label="Search input"
            >
                {/* Main input area */}
                <div className="flex items-end gap-2 px-4 py-3">
                    <div className="flex-1 min-w-0">
                        <textarea
                            id="ai-input-search"
                            ref={textareaRef}
                            value={value}
                            placeholder="Search the web..."
                            className={cn(
                                "w-full resize-none border-0 bg-transparent",
                                "text-sm leading-relaxed text-black dark:text-white",
                                "placeholder:text-black/40 dark:placeholder:text-white/40",
                                "focus:outline-none focus-visible:ring-0 p-0",
                                "font-normal"
                            )}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                        />
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1">

                        {/* Submit button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading || !hasContent}
                            className={cn(
                                "p-2 rounded-lg transition-all duration-150 flex-shrink-0",
                                "flex items-center justify-center",
                                hasContent && !isLoading
                                    ? "text-sky-500 bg-sky-500/10 hover:bg-sky-500/20 cursor-pointer"
                                    : "text-black/30 dark:text-white/30 bg-black/3 dark:bg-white/3",
                                "disabled:cursor-not-allowed"
                            )}
                            aria-label="Send message"
                        >
                            {isLoading ? (
                                <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Hint text
            {isFocused && (
                <p className="text-xs text-black/40 dark:text-white/40 mt-2 pl-1">
                    Press <kbd className="font-mono">Enter</kbd> to send, <kbd className="font-mono">Shift+Enter</kbd> for new line
                </p>
            )} */}
        </div>
    );
}
