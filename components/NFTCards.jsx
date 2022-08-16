import React from "react";
import CopyToClipboard from "./CopyClipboard";

const NFTCards = ({ nft }) => {
  return (
    <div className="w-1/4 flex flex-col " key={nft.id?.tokenId}>
      <div className="rounded-md">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft?.title}</h2>
          <p className="text-gray-600">
            Id: {nft.id?.tokenId.substring(nft.id?.tokenId.length - 4)}
          </p>
          <p className="text-gray-600 cursor-pointer">{`${nft.contract?.address.substring(
            0,
            4
          )} ... ${nft.contract?.address.substring(
            nft.contract.address.length - 4
          )}`}</p>

          <div className="flex  w-1/2">
            <CopyToClipboard content={nft.contract?.address} />
          </div>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft?.description?.substring(0, 150)}</p>
        </div>

        <div>
          <a
            href={`https://etherscan.io/token/${nft.contract.address}`}
            rel="noreferrer nofollow"
            target="_blank"
            className="text-blue-500"
          >
            View On Etherscan
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTCards;
