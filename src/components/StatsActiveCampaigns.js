const StatsActiveCampaigns = (props) => {

    const campaigns = props.campaigns;

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-GB");
    }

    return (
        <>
        <div className="p-5 bg-slate-600 rounded-md">
            {props.campaigns.length === 0 ? <p className="text-white">No active campaigns</p> : null}
                {campaigns.map((campaign, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-end justify-between p-8 border-y-[1px]">
                        <div className="flex flex-col md:w-10/12">
                        <p className="text-white font-semibold mb-5">
                            Completion date: {formatDate(campaign.completionDate)} - <span className="text-xs">{campaign.status}</span>
                        </p>
                            <div>
                                <span className="text-sm">{campaign.name}</span> - <span className="text-white font-bold">R{campaign.campaignAmount}</span>
                            </div>
                            
                            <span className="text-sm">
                                Contibutions: <span className="text-white font-bold">R{campaign.amountContributed}</span>
                            </span>

                            <progress
                                id="progressbar"
                                max={campaign.campaignAmount}
                                value={campaign.amountContributed}
                                className="animated mt-5"
                            ></progress>
                        </div>
                        <div className="btn btn-white text-sm w-full md:w-auto mt-4 md:mt-0" onClick={() => window.open(`https://chipn.netlify.app/campaign?id=${campaign.cid}&userid=${campaign.uid}`, '_blank')}>View</div>
                    </div>
                ))
                }
        </div>
        </>
    );
}
 
export default StatsActiveCampaigns;