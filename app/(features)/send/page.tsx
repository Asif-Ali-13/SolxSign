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
import { useRef } from "react";
import { toast } from "sonner";

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export default function Send() {
    const wallet = useWallet();
    const { connection } = useConnection();

    const addressRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    function clickHandler() {
        if (!addressRef.current || !amountRef.current) return;

        if (!addressRef.current.value || addressRef.current.value === "") {
            return addressRef.current.focus();
        }

        if (!amountRef.current.value || amountRef.current.value === "") {
            return amountRef.current.focus();
        }

        try{
            new PublicKey(addressRef.current.value).toBase58()
        }catch (e : any){
            return toast("Invalid Address",{
                style: {
                    color: '#D22B2B',
                }
            });
        }

        return sendSol(addressRef.current.value, amountRef.current.value);
    }

    async function sendSol(address : string, amount : string) {
        const to = new PublicKey(address);
        const amt = parseInt(amount);
        const txn = new Transaction();

        if (!wallet.publicKey) return;
        if (wallet.publicKey.toBase58() === to.toBase58()) 
            return toast("You are trying to send SOL to your current wallet",{
                style: {
                    color: '#D22B2B',
                }
            });

        txn.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: to,
            lamports: amt * LAMPORTS_PER_SOL,
        }))

        try{
            await wallet.sendTransaction(txn, connection);
            return toast("Send Successfully",{
                style: {
                    color: '#50C878',
                }
            });
        }catch(e : any){
            console.log(e.message);
            return toast("Transaction Failed. Try after some time.",{
                style: {
                    color: '#D22B2B',
                }
            });
        }
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="h-3/5 flex flex-col">
                <Card className="w-1/2 mx-auto flex flex-col align-middle h-90">
                    <CardHeader>
                        <CardTitle className="flex justify-center text-2xl font-bold">
                            Send SOL
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">

                        <div>
                            <label htmlFor="recipient">Recipient Address</label>
                            <Input ref={addressRef} type="text" placeholder="Solana Address..." />
                        </div>
                        <div>
                            <label htmlFor="amount">Amount</label>
                            <Input ref={amountRef} placeholder="0" />
                        </div>
                        <Button className="cursor-pointer mt-2"
                            onClick={clickHandler}>
                            Send
                        </Button>

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
