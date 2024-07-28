import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { useMemo } from 'react'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

export type queryConfigType = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParam: queryConfigType = useQueryParams()
  const queryConfig: queryConfigType = useMemo(
    () =>
      omitBy(
        {
          page: queryParam.page || '1',
          limit: queryParam.limit || '20',
          sort_by: queryParam.sort_by,
          exclude: queryParam.exclude,
          order: queryParam.order,
          price_max: queryParam.price_max,
          price_min: queryParam.price_min,
          rating_filter: queryParam.rating_filter,
          name: queryParam.name,
          category: queryParam.category
        },
        isUndefined
      ),
    [queryParam]
  )
  return queryConfig
}
