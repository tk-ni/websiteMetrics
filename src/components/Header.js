import { useCallback, useContext, useMemo } from 'react'
import DataCtx from 'context/DataCtx'

import FaceIcon from '@mui/icons-material/Face'
import MouseIcon from '@mui/icons-material/Mouse'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Tooltip from '@mui/material/Tooltip'

import 'styles/header.scss'

export default function Header() {
    const data = useContext(DataCtx)

    const formatNumber = useCallback(number => new Intl.NumberFormat('en-EN').format(number), [])

    const total = useMemo(() => {
        let impressions = 0
        let clicks = 0
        let cost = 0
        let conversions = 0

        for (const item of data) {
            impressions += item.impressions
            clicks += item.clicks
            cost += item.cost
            conversions += item.conversions
        }

        return {
            impressions: formatNumber(impressions),
            clicks: formatNumber(clicks),
            cost: formatNumber(cost),
            conversions: formatNumber(conversions)
        }
    }, [data])

    return (
        <div className="header">
            <h2>Website Metrics</h2>
            <p>
                <Tooltip title="Total Impressions">
                    <span>
                        <FaceIcon className="header-icon" /> {total.impressions}
                    </span>
                </Tooltip>
                <Tooltip title="Total Clicks">
                    <span>
                        <MouseIcon className="header-icon" /> {total.clicks}
                    </span>
                </Tooltip>
                <Tooltip title="Total Cost">
                    <span>
                        <AttachMoneyIcon /> {total.cost}
                    </span>
                </Tooltip>
                <Tooltip title="Total Conversions">
                    <span>
                        <TrendingUpIcon className="header-icon" /> {total.conversions}
                    </span>
                </Tooltip>
            </p>
        </div>
    )
}
