import React from 'react';

export default function Layout({ children }: { readonly children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            {children}
        </div>
    );
}