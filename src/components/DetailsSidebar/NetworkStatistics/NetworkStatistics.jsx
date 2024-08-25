import NetworkStatistic from "./NetworkStatistic";
import styles from "../DetailsSidebar.module.css";
import { networkStatisticsInfo } from "../../../utils/networkStatisticsInfo";
import RunWrapper from "../../../wrappers/RunWrapper/RunWrapper";

function NetworkStatistics() {
    return (
        <>
            <div className={styles.subSectionWrapper}>
                <h2 className="sidebarSubTitle" style={{ marginTop: "15px" }}>
                    Network Statistics
                </h2>
                <RunWrapper>
                    {Object.keys(networkStatisticsInfo).map((x) => {
                        return (
                            <NetworkStatistic
                                label={x}
                                algorithm={networkStatisticsInfo[x]}
                                bothRequired={networkStatisticsInfo[x].bothRequired}
                                key={x}
                            />
                        )
                    })}
                </RunWrapper>
            </div>
        </>
    )
}

export default NetworkStatistics;