"use client";
import { FC, useTransition } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { deleteCartItemAction, updateCartItemAction } from "@/_actions/cart";

interface updateCartProps {
  quantity: number;
  itemId: string;
  productId: string;
}

const UpdateCart: FC<updateCartProps> = ({ itemId, productId, quantity }) => {
  const [isPending, startTransition] = useTransition();

  const updateCartAction = async (type: "inc" | "dec" | "delete") => {
    switch (type) {
      case "inc":
        startTransition(async () => {
          await updateCartItemAction({ productId, quantity: quantity + 1 });
        });
        break;
      case "dec":
        startTransition(async () => {
          if (quantity === 1) {
            await deleteCartItemAction(itemId);
            return;
          }
          await updateCartItemAction({ productId, quantity: quantity - 1 });
        });
        break;
      case "delete":
        startTransition(async () => {
          await deleteCartItemAction(itemId);
        });
        break;
      default:
        return;
    }
  };
  return (
    <div className="flex items-center gap-x-2 px-1 mr-3">
      <Button
        variant="outline"
        size="icon"
        disabled={isPending}
        onClick={() => updateCartAction("inc")}
      >
        <Icons.add className="w-3 h-3" />
      </Button>
      <span className="text-muted-foreground text-sm">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        disabled={isPending}
        onClick={() => updateCartAction("dec")}
      >
        <Icons.remove className="w-3 h-3" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={isPending}
        onClick={() => updateCartAction("delete")}
      >
        <Icons.trash className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default UpdateCart;
