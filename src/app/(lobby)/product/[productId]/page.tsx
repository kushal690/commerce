import { FC } from 'react'
import PreviewImages from './PreviewImages'

interface pageProps {
  params: {
    productId: string
  }
}

const page: FC<pageProps> = ({ params }) => {
  const { productId } = params
  return <div className='p-20 flex gap-8'>
    <PreviewImages />
  </div>
}

export default page
