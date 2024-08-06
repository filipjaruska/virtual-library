import React from 'react';
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="container flex flex-col items-center justify-center">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="rounded-lg border"
                    min-width="800px"
                    min-height="600px"
                >
                    <ResizablePanel defaultSize={50} minSize={15}>
                        <div className="flex h-[400px] items-center justify-center p-6">
                            <Link href={"/dashboard/account"} className="flex flex-col items-center justify-center hover:text-primary">
                            <FaUser className="h-24 w-24" />
                            <span className="font-semibold pt-2">Account Setting</span>
                            </Link>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle/>
                    <ResizablePanel defaultSize={50} minSize={15}>
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel defaultSize={25} minSize={15}>
                                <div className="flex h-full items-center justify-center p-6">
                                    <Link href={"/dashboard/account"} className="flex flex-col h-full items-center justify-center hover:text-primary">
                                        <FaUser className="h-24 w-24" />
                                        <span className="font-semibold pt-2">Account Setting</span>
                                    </Link>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle/>
                            <ResizablePanel defaultSize={75} minSize={15}>
                                <div className="flex h-full items-center justify-center p-6">
                                    <Link href={"/dashboard/account"} className="flex flex-col h-full items-center justify-center hover:text-primary">
                                        <FaUser className="h-24 w-24" />
                                        <span className="font-semibold pt-2">Account Setting</span>
                                    </Link>
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
}