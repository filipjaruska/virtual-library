'use client';
import React, { useState } from 'react';
import { setHidePopupCookie } from '@/lib/services/get-kbar-popup';
import { motion, AnimatePresence } from "motion/react"

interface KBarInfoPopupContentProps {
    initialHidePopup: boolean;
}

const KBarInfoPopupContent: React.FC<KBarInfoPopupContentProps> = ({ initialHidePopup }) => {
    const [hidePopup, setHidePopup] = useState(initialHidePopup);

    return (
        <AnimatePresence>
            {!hidePopup && (
                <motion.div
                    key="popup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="fixed bottom-4 right-4 bg-card text-card-foreground p-3 rounded shadow-lg">
                        <div className="flex justify-between items-center">
                            <span>Press <kbd className="bg-muted px-2 py-1 rounded">⌘</kbd> + <kbd className="bg-muted px-2 py-1 rounded">K</kbd> to open the command bar.</span>
                            <button onClick={() => {
                                setHidePopup(true);
                                setHidePopupCookie(true);
                            }} className="ml-4 text-muted-foreground hover:text-card-foreground">×</button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default KBarInfoPopupContent;