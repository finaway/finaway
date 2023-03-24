import { useAppSlice } from 'app/global-stores/app';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';

export function useAppBarTitle(title: string) {
  const dispatch = useDispatch();
  const { actions } = useAppSlice();

  useEffectOnce(() => {
    dispatch(actions.setAppBarTitle(title));
  });
}
