"use client";
import { useEffect, useState } from 'react';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { Layers2 } from "lucide-react"
import { ThemeButton } from "./themeButton"


export function Navbar() {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null;

    return (
        <div className="flex items-center justify-between mx-auto pt-4 mb-8">
            <div className="gap-4 flex items-center ">
                <Layers2 className="size-10" />
                <div className="text-4xl font-bold">SolxSign</div>
            </div>
            <div className="flex items-center gap-4 align-middle ">
                <ThemeButton />
                <WalletMultiButton />
            </div>
        </div>
    )
}