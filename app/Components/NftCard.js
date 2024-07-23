import { useState } from 'react';

export default function NftCard({ nft }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(nft.contract.address)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds

                // Listen for Ctrl+P event to paste the copied address
                document.addEventListener('keydown', handlePaste);
            })
            .catch((error) => {
                console.error('Failed to copy address:', error);
            });
    };

    const handlePaste = (event) => {
        if (event.ctrlKey && event.key === 'p') {
            navigator.clipboard.readText()
                .then((text) => {
                    // Handle the pasted text here
                    console.log('Pasted text:', text);
                })
                .catch((error) => {
                    console.error('Failed to read clipboard:', error);
                });
        }
    };

    return (
        <div className="w-1/4 flex flex-col">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.image.pngUrl} alt={nft.title} />
            </div>
            <div className="flex flex-col gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
                <div>
                    <h2 className="text-xl text-gray-800">{nft.title}</h2>
                    <p className="text-gray-600">Id: {nft.tokenId.substr(nft.tokenId.length - 4)}</p>
                    <div className="relative">
                        <p
                            className="text-gray-600 hover:cursor-pointer hover:text-blue-500"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onClick={handleCopy}
                        >
                            {`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}
                        </p>
                        {showTooltip && (
                            <div className="absolute left-0 bottom-full mb-1 bg-slate-400 text-gray-800 border border-gray-300 rounded-md p-2 shadow-lg z-10">
                                {copied ? 'Address copied!' : 'Copy'}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-grow mt-2">
                    <p className="text-gray-600">{nft.description?.substr(0, 150)}</p>
                </div>
                <div className="flex justify-center mb-1">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://etherscan.io/token/${nft.contract.address}`}
                        className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-md text-white cursor-pointer"
                    >
                        View on Etherscan
                    </a>
                </div>
            </div>
        </div>
    );
}