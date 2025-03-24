import { Button } from "@/components/ui/button";

export function Hero() {

    return (
        <div className="text-center mt-12">
            <div className="p-4 mb-10">
                <div className="text-6xl font-extrabold p-2">
                    One for All
                </div>
                <div className="text-xl ">
                    manage airdrops, check balances, sign messages, and send transactions
                </div>
                <div className="text-2xl font-bold p-2">
                    Securely and Effortlessly
                </div>
            </div>
            <div className="text-xl font-semibold mb-4">
                Get Started
            </div>
            <div>
                <Button variant={"secondary"} className="h-18 w-70 text-xl font-bold bg-violet-700 text-white">Explore SolxSign</Button>
            </div>
        </div>

    )
}