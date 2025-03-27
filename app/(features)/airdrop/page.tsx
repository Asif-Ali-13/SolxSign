"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react";
import { toast, Toaster } from "sonner"

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRef } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";


export default function AirDrop() {
    const inputRef = useRef<HTMLInputElement>(null);

    const wallet = useWallet();
    const { connection } = useConnection();

    function handleClick() {
        if (!inputRef.current) return;

        if (!inputRef.current.value || inputRef.current.value === "") {
            return inputRef.current.focus();
        }
        else if (inputRef.current.value <= '0' || inputRef.current.value >= '5') {
            return toast("Amount should be greater than 0 and less than equal to 5.",{
                style: {
                    color: '#D22B2B', // Apply green color directly
                }
            });
        }

        requestAirdrop(inputRef.current.value);
    }

    async function requestAirdrop(amount : string) {
        if (!wallet.publicKey) return;
        let solAmt = parseInt(amount);
        try{
            await connection.requestAirdrop(wallet.publicKey, solAmt * LAMPORTS_PER_SOL);
            return toast("Airdrop Requested Successfully",{
                style: {
                    color: '#50C878',
                }
            });
        }catch(e : any){
            return toast("Airdrop Request Failed due to " + e.message);
        }
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="h-3/5 flex flex-col">
                <Card className="w-1/2 mx-auto flex flex-col align-middle">
                    <CardHeader>
                        <CardTitle className="flex justify-center text-2xl font-bold">
                            Request Airdrop
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <Input ref={inputRef} placeholder="Sol Amount..." />
                        <Button
                            className="cursor-pointer"
                            onClick={handleClick}
                        >
                            Confirm Airdrop
                        </Button >
                    </CardContent>
                    {
                        (wallet.connected) ? null :
                            <CardFooter className="gap-1">
                                <Info className="text-red-400 " />
                                <p className="text-red-300 hover:text-red-400">
                                    Wallet is not connected
                                </p>
                            </CardFooter>
                    }
                </Card>
            </div>
        </div>
    );
}
