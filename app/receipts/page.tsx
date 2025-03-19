import PDFDropzone from "@/components/PDFDropZone"
import ReceiptList from "@/components/ReceiptList"
const ReceiptsPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <PDFDropzone />
            <ReceiptList />
        </div>
    </div>
  )
}
export default ReceiptsPage