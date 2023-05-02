export interface IStatusDialog {
  status: 'idle' | 'loading' | 'success' | 'error';
  description: string;
  title:string;
}
