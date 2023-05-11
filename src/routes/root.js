import Nav from "../components/Nav";
import Auth from "../components/Auth";

export default function Root() {
  const token = localStorage.getItem("token");

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  const campaigns = [
    {
      name: "Family holiday fund",
      status: "Active",
      completionDate:
        "Sun Dec 04 2023 10:25:35 GMT+0200 (South Africa Standard Time)",
      campaignAmount: "8500",
      amountContributed: "8000",
    },
    {
      name: "Guitar fund",
      status: "Active",
      completionDate:
        "Sun Dec 05 2023 10:25:35 GMT+0200 (South Africa Standard Time)",
      campaignAmount: "10000",
      amountContributed: "8000",
    },
    {
      name: "Jimmys birthday",
      status: "Active",
      completionDate:
        "Sun Dec 06 2023 10:25:35 GMT+0200 (South Africa Standard Time)",
      campaignAmount: "10000",
      amountContributed: "9000",
    },
  ];

  const payoutHandler = () => {
    alert("Payout");
  };



  return (
    <>
      {!token ? (
        <Auth />
      ) : (
        <div className="flex flex-col md:h-screen md:flex-row">
          <Nav />

          <div id="dash-container">
            <h1>Campaigns ending this week</h1>

            <div>
              {campaigns.map((campaign, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-end justify-between p-8 border-y-[1px]"
                >
                  <div className="flex flex-col w-full md:w-10/12">
                    <p className="text-white font-semibold mb-5">
                      Completion date: {formatDate(campaign.completionDate)} -{" "}
                      <span className="text-xs">{campaign.status}</span>
                    </p>
                    <div>
                      <span className="text-sm">{campaign.name}</span> -{" "}
                      <span className="text-white font-bold">
                        R{campaign.campaignAmount}
                      </span>
                    </div>

                    <span className="text-sm">
                      Contibutions:{" "}
                      <span className="text-white font-bold">
                        R{campaign.amountContributed}
                      </span>
                    </span>

                    <progress
                      id="progressbar"
                      max={campaign.campaignAmount}
                      value={campaign.amountContributed}
                      className="animated mt-5"
                    ></progress>
                  </div>
                  <div
                    className="btn btn-info text-sm w-full md:w-auto mt-4 md:mt-0"
                    onClick={() => payoutHandler()}
                  >
                    Payout
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
