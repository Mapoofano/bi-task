import Form from '../../../components/form';
import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
  useAccount,
} from 'wagmi';
import Input from '../../../components/input';
import { ERC20 } from '../../../constant/ABI/ERC20';
import { useState } from 'react';
import { calculateNumberDecimalContract } from '../../../utils/bignumber';
import WalletBalance from '../../../components/walletBalance';
import StatusDialog from '../../../components/statusDialog';

const Mint = () => {
  const [amount, setAmount] = useState('');
  const { chain } = useNetwork();

  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: '0x65a5ba240CBd7fD75700836b683ba95EBb2F32bd',
    abi: ERC20,
    functionName: 'mint',
    chainId: chain?.id,
    args: [calculateNumberDecimalContract(amount, 18).toString()],
    enabled: Boolean(amount),
  });

  const { data, write } = useContractWrite(config);

  const { status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="bg-slate-50 rounded-xl p-2 justify-center items-center space-y-2">
      <WalletBalance title="Current" address={address} />
      <Form
        buttonTitle="Mint"
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
        disabled={amount && write && Number(amount) > 0 ? false : true}
      >
        <Input
          type="text"
          value={amount}
          placeholder="Enter a number"
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
          status === 'success'
            ? 'Mint tokens have been successfully done'
            : 'Something went wrong'
        }
      />
    </div>
  );
};

export default Mint;
