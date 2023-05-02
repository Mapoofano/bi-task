import { useBalance, useNetwork } from 'wagmi';
import type { IWalletBalance } from './types';

const WalletBalance = (props: IWalletBalance) => {
  const { chain } = useNetwork();

  const { data } = useBalance({
    address: props.address,
    token: '0x65a5ba240CBd7fD75700836b683ba95EBb2F32bd',
    chainId: chain?.id,
    watch: true,
  });

  return (
    <div className="flex font-bold w-full justify-between text-xs my-3 text-gray-700">
      {props.title} Balance:
      <span>
        {data?.formatted} {data?.symbol}
      </span>
    </div>
  );
};

export default WalletBalance;
