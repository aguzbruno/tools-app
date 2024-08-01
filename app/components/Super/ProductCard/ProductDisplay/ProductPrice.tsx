export default function ProductPrice({price}:{price:Number}){
return(
    <span className="flex items-center w-1/5 text-md font-semibold text-black">
    € {price.toFixed(2)}
  </span>
)
} 