export interface IBear {
  bears: number;
}

export interface ICommonModalStore {
  modal: ICommonModal;
  onClick: () => void;
  openModal: (title: string, message: string, onClick: () => void) => void;
  closeModal: () => void;
}

export interface ICommonModal {
  show: boolean;
  title: string;
  message: string;
}
