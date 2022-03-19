import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { NFTMetadata, ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

type Props = {}

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
}

export default function Nft({ }: Props) {

    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState<any>();
    const [listings, setListings] = useState<any>();
    const [isListed, setIsListed] = useState('');


    const router = useRouter()

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/mhpgUgCc0OqnPxqLHl7nhNL-3LcRjAPO'
        )
        return sdk.getNFTModule('0xD1c8f79d37A6ddABe2E5d2fc59984082d04caef5')
    }, [provider])

    useEffect(() => {
        if (!nftModule) return
            ; (async () => {
                const nfts = await nftModule.getAll()

                const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId);

                if (selectedNftItem) setSelectedNft(selectedNftItem)

            })()

        const isListed = router.query.isListed as string;

        setIsListed(isListed);
    }, [nftModule])

    const marketPlaceModule: any = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/mhpgUgCc0OqnPxqLHl7nhNL-3LcRjAPO'
        )

        return sdk.getMarketplaceModule(
            '0x0658A5e6F1ea367B7b6612a02376cD0fd2da377f'
        )
    }, [provider])

    useEffect(() => {
        if (!marketPlaceModule) return;

        (async () => {

            setListings(await marketPlaceModule.getAllListings())
        })()

    }, [marketPlaceModule])

    return (
        <div>
            <Header />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.topContent}>
                        <div className={style.nftImgContainer}>
                            <NFTImage selectedNft={selectedNft} />
                        </div>
                        <div className={style.detailsContainer}>
                            <GeneralDetails selectedNft={selectedNft} />
                            <Purchase
                                isListed={isListed}
                                selectedNft={selectedNft}
                                listings={listings}
                                marketPlaceModule={marketPlaceModule}
                            />
                        </div>
                    </div>
                    <ItemActivity />
                </div>
            </div>
        </div>
    )
}