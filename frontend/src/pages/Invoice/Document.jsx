import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from '../../components/TopNavigation'
import { toast } from 'react-toastify'
import Table from '../../components/Table'
import { InvoiceHeader } from '../../components/InvoiceHeader'
import { InvoiceFooter } from '../../components/InvoiceFooter'
import { useRef } from 'react'
import { Button } from '@mui/material'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const Document = () => {

    const items = useSelector(state => state.item)
    const res = useSelector(state => state.res)
    const info = useSelector(state => state.info)
    const printRef = useRef()

    let showItem, showRes, showInfo

    let pdfName = 'invoice123'

    const handlePdfDownload = async ()=>{
        const element = printRef.current;
        const canvas = await html2canvas(element)
        const data = canvas.toDataURL('image/png')

        const pdf = new jsPDF('p','mm',[297, 210])
        const imgProperties = pdf.getImageProperties(data)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save(`{pdfName}.pdf`)

        toast.success('Document has been downloaded!')
    }

    
  return (
    <div style={{maxWidth:600, margin:'auto', border:1}}>
    <div ref = {printRef} >
        {info && <InvoiceHeader/>}
        {items && <Table/>}
        {info && <InvoiceFooter/>}
    </div>
    <Button sx={{bgcolor:'#FF225E', mt:5}} variant="contained" onClick={handlePdfDownload}>Download</Button>
    </div>

    
  )
}
