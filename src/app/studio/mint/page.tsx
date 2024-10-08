// src/app/studio/mint/page.tsx

"use client";

import { FC, useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { RequestAirdrop } from './components/RequestAirdrop';
import useUserSOLBalanceStore from './stores/useUserSOLBalanceStore';
import { TextInput } from './components/TextInput';
import { MintNFT as MintNFTComponent } from './components/MintNFT';

const MintNFT: FC = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [name, setName] = useState<string>('');
    const [symbol, setSymbol] = useState<string>('');
    const [groupAddr, setGroupAddr] = useState<string>('');
    const [jsonURI, setJsonURI] = useState<string>('');

    const balance = useUserSOLBalanceStore((s) => s.balance);
    const { getUserSOLBalance } = useUserSOLBalanceStore();

    useEffect(() => {
        const fetchBalance = async () => {
            if (wallet.publicKey) {
                try {
                    await getUserSOLBalance(wallet.publicKey, connection);
                } catch (error) {
                    console.error("Error getting balance:", error);
                }
            }
        };
        fetchBalance();
    }, [wallet.publicKey, connection, getUserSOLBalance]);

    return (
        <div className="mt-20 min-h-screen flex flex-col items-center justify-center dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="w-full max-w-4xl flex flex-col items-center space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
                        Mint Your NFT
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                        Easily mint your own NFTs on the Solana blockchain. Fill out the details and click mint!
                    </p>
                </div>

                {/* Balance Section */}
                <div className="w-full text-center">
                    <RequestAirdrop />
                    {wallet && (
                        <div className="flex justify-center mt-4">
                            <div className="flex items-center text-2xl font-semibold text-slate-900 dark:text-slate-300">
                                <span>{(balance || 0).toLocaleString()}</span>
                                <span className="ml-2 text-slate-600 dark:text-slate-400">SOL</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Inputs */}
                <div className="w-full flex flex-col space-y-4 items-center">
                    <TextInput label="Name" placeholder="Enter NFT name" value={name} onChange={setName} />
                    <TextInput label="Symbol" placeholder="Enter NFT symbol" value={symbol} onChange={setSymbol} />
                    <TextInput label="Group Address" placeholder="Enter Group address" value={groupAddr} onChange={setGroupAddr} />
                    <TextInput label="JSON URI" placeholder="Enter JSON URI" value={jsonURI} onChange={setJsonURI} />
                </div>

                {/* Mint NFT Button */}
                <div className="w-full flex justify-center">
                    <MintNFTComponent name={name} symbol={symbol} groupAddr={groupAddr} jsonURI={jsonURI} />
                </div>

                {/* Link to Account Page */}
                <div className="mt-6 text-center">
                    {/* <Link href="/studio/account">
                        <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500">
                            Go to Account Page
                        </span>
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default MintNFT;
