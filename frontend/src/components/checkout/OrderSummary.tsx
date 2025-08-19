import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
}

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  className?: string;
}

const OrderSummary = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  className
}: OrderSummaryProps) => {
  return (
    <div className={cn("bg-gray-50 p-8 rounded-lg", className)}>
      <h2 
        className="text-black font-normal uppercase mb-6"
        style={{
          fontSize: '24px',
          fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
          fontWeight: 400,
          color: 'rgba(0,0,0,1)'
        }}
      >
        Order Summary
      </h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
            <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-gray-200 rounded">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 
                className="text-black font-normal text-sm truncate"
                style={{
                  fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
                  fontWeight: 400
                }}
              >
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                Size: {item.size} | Color: {item.color}
              </p>
              <p className="text-gray-600 text-sm">
                Qty: {item.quantity}
              </p>
            </div>
            <div className="text-right">
              <p 
                className="text-black font-normal text-sm"
                style={{
                  fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
                  fontWeight: 400
                }}
              >
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="space-y-3 pt-6 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-black">{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-black">{shipping}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="text-black">{tax}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-gray-200">
          <span 
            className="text-black font-medium"
            style={{
              fontSize: '18px',
              fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
              fontWeight: 500
            }}
          >
            Total
          </span>
          <span 
            className="text-black font-medium"
            style={{
              fontSize: '18px',
              fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
              fontWeight: 500
            }}
          >
            {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
