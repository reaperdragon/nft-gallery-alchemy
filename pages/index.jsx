import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import NFTCards from "../components/NFTCards";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [pages, setPages] = useState(0);
  const [loadPage, setLoadPage] = useState(1);
  const [newNFTs, setNewNFTs] = useState([]);

  const fetchNFTs = async () => {
    let nfts;
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTs/`;

    console.log("Fetching NFTs");
    if (!collection.length) {
      var requestOptions = {
        method: "GET",
      };

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("Fetching NFTs for collection owned by address");

      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log(nfts);
      setNFTs(nfts.ownedNfts);
      setPages(0);
      setLoadPage(1);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
        setPages(0);
        setLoadPage(1);
      }
    }
  };

  const loadMoreNfts = (page) => {
    let start = (page - 1) * 10;
    let end = start + 9;
    let newNFTs = NFTs.slice(start, end);
    console.log("New NFTs : ", newNFTs);
    setNewNFTs(newNFTs);
    setPages(Math.ceil(NFTs.length / 10));
  };

  useEffect(() => {
    loadMoreNfts(loadPage);
    window.scrollTo(0, 0);
  }, [NFTs, loadPage]);

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <Head>
          <title>NFT-Gallery</title>
        </Head>
        <input
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          value={wallet}
          type={"text"}
          placeholder="Add your wallet address"
        ></input>
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value);
          }}
          value={collection}
          type={"text"}
          placeholder="Add the collection address"
        ></input>
        <label className="text-gray-600 ">
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) => {
              setFetchForCollection(e.target.checked);
            }}
          />{" "}
          Fetch for Collection
        </label>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else {
              fetchNFTs();
            }
          }}
        >
          Let's Go!
        </button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {newNFTs.length &&
          newNFTs.map((nfts) => <NFTCards key={nfts.id?.tokenId} nft={nfts} />)}
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {pages > 0 &&
          [...Array(pages)].map((data, index) =>
            index + 1 == loadPage ? (
              <button
                className={
                  "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm max-w-max"
                }
                key={index}
                onClick={() => {
                  setLoadPage(index + 1);
                }}
              >
                More NFTs page {index + 1}
              </button>
            ) : (
              <button
                className={
                  "disabled:bg-slate-500 text-white max-w-max bg-blue-400 px-2 py-2 mt-3 rounded-sm"
                }
                key={index}
                onClick={() => {
                  setLoadPage(index + 1);
                }}
              >
                More NFTs page {index + 1}
              </button>
            )
          )}
      </div>
    </div>
  );
};

export default Home;
