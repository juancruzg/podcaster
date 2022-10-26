import React, { useState, createContext } from 'react';

export interface LoaderProviderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export interface LoaderContextModel {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextModel>({} as LoaderContextModel);
const { Provider } = LoaderContext;

/**
 * Create provider for HandleAsync states
 * @param {node} children
 * @returns object
 */
export default function LoaderProvider(props: LoaderProviderProps) {
  const { children, isLoading } = props;
  const [isLoadingContext, setIsLoading] = useState(isLoading);

  return (
    <Provider
      value={{
        isLoading: isLoadingContext,
        setIsLoading,
      }}
    >
      {children}
    </Provider>
  );
}

export const useLoaderContext = () => React.useContext(LoaderContext);
