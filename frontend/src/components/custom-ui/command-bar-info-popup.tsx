'use client';
import React, { useState } from 'react';

const KBarInfoPopup = () => {
    const [showPopup, setShowPopup] = useState(true);

    if (!showPopup) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-card text-card-foreground p-3 rounded shadow-lg">
            <div className="flex justify-between items-center">
                <span>Press <kbd className="bg-muted px-2 py-1 rounded">⌘</kbd> + <kbd className="bg-muted px-2 py-1 rounded">K</kbd> to open the command bar.</span>
                <button onClick={() => setShowPopup(false)} className="ml-4 text-muted-foreground hover:text-card-foreground">×</button>
            </div>
        </div>
    );
};

export default KBarInfoPopup;