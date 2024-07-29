import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { ModalSlice } from "@/shared/lib/redux-store/slices/modal-slice/modalSlice";
import { IModalData, ModelType } from "@/shared/lib/redux-store/slices/modal-slice/type";

export const useModal = () => {
  const modalData = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const onClose = () => {
    setTimeout(() => {
      dispatch(ModalSlice.setCloseModal());
    }, 200);
  };

  const onOpenModal = (type: ModelType, data?: IModalData) => {
    dispatch(
      ModalSlice.setOpenModal({
        isOpen: true,
        type: type!,
        data: data,
      }),
    );
  };

  return { modalData, onClose, onOpenModal };
};
