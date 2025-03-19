'use client';

import { useParams } from "next/navigation";

const ReceiptPage = () => {
    const params = useParams<{id: string}>();
  return <div>Receipt: {params.id}</div>;
};

export default ReceiptPage;