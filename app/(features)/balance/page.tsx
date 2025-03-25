"use client";
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card"

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { Info } from "lucide-react"

export default function Balance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const getBalance = async () => {
            if (!wallet.publicKey) return;
            const balance = await connection.getBalance(wallet.publicKey);
            setBalance(balance);
        }

        getBalance();

        return () => {
            setBalance(0);
        }
    },[wallet.publicKey]);

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="h-3/5 flex flex-col">
                <Card className="w-3/6 mx-auto flex flex-col align-middle">
                    <CardContent className="flex flex-col gap-4">
                        <div className="text-3xl font-extrabold flex justify-center">
                            Current Balance
                        </div>
                        <div className="text-2xl font-bold flex justify-center">
                            {balance / LAMPORTS_PER_SOL} : SOL
                        </div>
                    </CardContent>
                    {
                        (wallet.connected) ? null : 
                        <CardFooter className="gap-1">
                            <Info className="text-red-400 "/>
                            <p className="text-red-300 hover:text-red-400">Wallet is not connected</p>
                        </CardFooter>
                    }
                </Card>
            </div>
        </div>
    );
}