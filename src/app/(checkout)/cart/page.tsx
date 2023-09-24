import { getCartAction } from '@/_actions/cart';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header';
import { Shell } from '@/components/shells/shell';
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = async ({ }) => {
  const cart = await getCartAction();
  const cartItems = cart?.items ?? [];

  const totalPrice = cartItems.reduce((total, item) => {
    return total + Number(item.product.price) * Number(item.quantity)
  }, 0)

  return <Shell>
    <PageHeader aria-labelledby="checkout-page-header">
      <PageHeaderHeading size="sm">Checkout</PageHeaderHeading>
      <PageHeaderDescription size="sm">
        Select the items you want to order
      </PageHeaderDescription>
    </PageHeader>
    <div className='flex justify-between'>
      <div className='border border-muted-foreground'></div>
    </div>
  </Shell>
}

export default page
