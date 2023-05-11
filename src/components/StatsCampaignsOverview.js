import { useEffect } from "react";
import Loader from "./Loader/Loader";

const StatsCampaignsOverview = (props) => {

    useEffect(() => {
        console.log(props)
    }, [props])

    return (
        <div className="flex flex-row">
            <div className="text-center w-6/12 border-r-[1px] border-white">
                <span className="font-bold text-[10vw] text-green-400 leading-[1]">{!props.active ? <Loader /> : props.active}</span>
                <h2 className="text-sm text-slate-400">Active Campaigns</h2>
            </div>
            <div className="text-center w-6/12 flex flex-col justify-end">
                <span className="font-bold text-[5vw] text-white leading-[1]">{!props.total ? <Loader /> : props.total}</span>
                <h2 className="text-sm text-slate-400">Total Campaigns</h2>
            </div>
        </div>
    );
}
 
export default StatsCampaignsOverview;