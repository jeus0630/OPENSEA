import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

export default function Collections({ }: Props) {
    const router = useRouter();

    return (
        <Link href="/">
            <div>{router.query.collectionId}</div>
        </Link>
    )
}