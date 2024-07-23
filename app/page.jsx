"use client"

import Image from "next/image";
import { useState } from 'react';
import NftCard from './Components/NftCard'
export default function Home() {
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [only, setOnly] = useState(false)

  const find = async () => {
    let nfts;
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const apiKey = "fblimHvHD0dY_G5TX664n8Imwc4T6LaV";
    if (!contract.length) {
      nfts = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&withMetadata=true`, options)
        .then(response => response.json());
    } else {
      nfts = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&withMetadata=true&contractAddresses%5B%5D=${contract}`, options)
        .then(response => response.json());
    }

    if (nfts) {
      setNFTs(nfts.ownedNfts);
    }
  };
  const findcontract = async () => {
    let nfts;
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const apiKey = "fblimHvHD0dY_G5TX664n8Imwc4T6LaV";
    if (!contract.length) {
      alert("Give the contract/collection address")
    }
    else {
      nfts = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForContract?contractAddress=${contract}&withMetadata=true`, options)
        .then(response => response.json());
    }
    if (nfts) {
      setNFTs(nfts.nfts)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={only} className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e) => { setAddress(e.target.value) }} type={"text"} placeholder="Add your wallet address"></input>
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e) => { setContract(e.target.value) }} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e) => { setOnly(e.target.checked) }} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-600 hover:bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            if (only) {
              findcontract()
            } else find()
          }
        }>Find </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NftCard key={nft.image.pngUrl} nft={nft}></NftCard>
            )
          })
        }
      </div>
    </div>
  );
}