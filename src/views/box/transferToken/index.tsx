import { useState } from 'react';
import Form from '../../../components/form';
import Input from '../../../components/input';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { calculateNumberDecimalContract } from '../../../utils/bignumber';
import { ERC20 } from '../../../constant/ABI/ERC20';
import WalletBalance from '../../../components/walletBalance';
import StatusDialog from '../../../components/statusDialog';
import { ethers } from 'ethers';

const Transfer = () => {
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [wrongAddress, setWrongAddress] = useState(false);
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: '0x65a5ba240CBd7fD75700836b683ba95EBb2F32bd',
    abi: ERC20,
    functionName: 'transfer',
    chainId: chain?.id,
    args: [
      recipientAddress,
      calculateNumberDecimalContract(amount, 18).toString(),
    ],
    enabled: Boolean(amount) && Boolean(recipientAddress),
  });

  const { data, write } = useContractWrite(config);

  const { status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="bg-slate-50 rounded-xl p-2 justify-center items-center space-y-2">
      <WalletBalance title="Current" address={address} />
      <Form
        buttonTitle="Transfer"
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
        disabled={
          recipientAddress && amount && write && Number(amount) > 0
            ? false
            : true
        }
      >
        <WalletBalance
          title="Recipient"
          address={recipientAddress as `0x${string}`}
        />
        <Input
          type="text"
          value={recipientAddress}
          placeholder="Enter recipient address wallet"
          onChange={(e) => {
            const { value } = e.target;
            if (ethers.utils.isAddress(value)) {
              setRecipientAddress(ethers.utils.getAddress(value));
              setWrongAddress(false);
            } else {
              setWrongAddress(true);
            }
          }}
        />
        <span className={`${wrongAddress ? 'block' : 'hidden'} text-xs text-rose-600`}>
          NOT a valid Ethereum address
        </span>
        <Input
          type="text"
          value={amount}
          placeholder="Enter amount"
          onChange={(e) => {
            const { value } = e.target;
            const regex = /^[0-9]+\.?[0-9]*$/;
            if (value === '' || regex.test(value)) {
              setAmount(value);
            }
          }}
        />
      </Form>
      <StatusDialog
        status={status}
        title={status === 'success' ? 'Successful' : 'Error'}
        description={
          status === 'success' ? 'Transfer Done' : 'Something went wrong'
        }
      />
    </div>
  );
};

export default Transfer;
