import * as React from 'react'
import {
    Icon, Spinner, SpinnerSize, initializeIcons
} from '@fluentui/react';
import { AuthContext } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import Details from '../SubPages/Details';
import ShiftManagement from '../SubPages/ShiftManagement';
import LeaveManagement from '../SubPages/LeaveManagement';
import Payslip from '../SubPages/Payslip';
import PayrollInquiries from '../SubPages/PayrollInquiries';
import Documents from '../SubPages/Documents';
import Forms from '../SubPages/Forms';

initializeIcons();
interface IEmployeeProps {
    fname: string;
    lname: string;
    title: string;
    emailad: string;
}
const Home = () => {
    const { logout, isAuthenticated, isLoggedIn, isLoading, version } = React.useContext(AuthContext);
    const history = useHistory();
    React.useEffect(() => {
        if (!isAuthenticated && !isLoggedIn) {
            history.push('/login');
        }
    }, [isAuthenticated, isLoggedIn, history]);

    const [targetedrecord, setTargetedRecord] = React.useState("");
    const [selectedMenu, setSelectedMenu] = React.useState("home");
    const [selectedMenuClass, setSelectedMenuClass] = React.useState("home");
    const [openLoader, setOpenLoader] = React.useState(isLoading);


    const [imageLoading, setImageLoading] = React.useState(false);
    const [profilePhoto, setProfilePhoto] = React.useState("")
    const [openImageUploader, setOpenImageUploader] = React.useState(false);
    const [charName, setCharName] = React.useState("JM");

    const [empProps, setEmpProps] = React.useState<IEmployeeProps>({
        fname: "Jemuel", lname: "Mandia", title: "Sharepoint Developer", emailad: "jemuel.mandia@flatplanet.com.au"
    })

    const [availableTabs, setAvailableTabs] = React.useState([
        { key: "LeaveManagement", text: "Leave Management" },
        { key: "ShiftManagement", text: "Shift Management" },
        { key: "Payslip", text: "Payslip" },
        { key: "PayrollInquiries", text: "Payroll Inquiries" },
        { key: "Documents", text: "Documents" },
        { key: "Forms", text: "Forms" },
    ]);

    const setMenuActive = (e: any, activemenu: any) => {
        setOpenLoader(true)
        document.getElementById('emphubloader')?.classList.add('loader-active');
        setSelectedMenuClass(activemenu)
        setTimeout(() => {
            setSelectedMenu(activemenu);
        }, 1500);
        setTimeout(() => {
            setOpenLoader(false)
            document.getElementById('emphubloader')?.classList.remove('loader-active');
        }, 3000);
        localStorage.setItem("pageSetting", JSON.stringify({
            openedTab: activemenu,
            nestedTab: true,
            selectedRecord: "",
        }))
        setTargetedRecord("");
    }

    const triggerFileInput = () => {
        setOpenImageUploader(true)
    }

    return (
        <div className="ms-Grid emphub-container" dir="ltr">
            <div className='emphub-header ms-Grid-row'>
                <div className="emphub-header-title ms-Grid-col">
                    <span className="appname" >Employee</span>
                    <span className="appname" >Hub </span>
                    <span className='version'>{version} | <a onClick={logout}>logout</a></span>
                </div>
                <div className="emphub-header-menu ms-Grid-col">
                    <div>
                        <span className={selectedMenuClass === "home" ? "emphub-menu-active" : ""} onClick={(e) => setMenuActive(e, 'home')}>Details</span>
                        {
                            availableTabs.map((tab: any, index: number) =>
                                <span key={index} className={selectedMenuClass === tab.text ? "emphub-menu-active" : ""} onClick={(e) => setMenuActive(e, tab.key)}>{tab.text}</span>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="emphub-body ms-Grid-row">
                <div className="emphub-body-profile-info ms-Grid-col ms-sm12 ms-md4 ms-lg2">
                    <div className="profile-image"  >
                        <div className='image-container'>
                            {
                                imageLoading ?
                                    <div className='image-spinner'>
                                        <Spinner size={SpinnerSize.large} />
                                    </div>
                                    :
                                    profilePhoto == "" ?
                                        <div className="svg-container">
                                            <svg width="100%" height="100%">
                                                <circle cx="50%" cy="50%" r="100" fill="#3776aa" />
                                                <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="100px" fontFamily="Arial" dy=".3em">{charName}</text>
                                            </svg>
                                        </div>

                                        :
                                        <div className="myProfilePicture" >
                                            <img src={profilePhoto != "" ? profilePhoto : ""} className="avatar" />
                                        </div>

                            }

                            {
                                imageLoading ?
                                    "" :
                                    <div className='upload-image' onClick={triggerFileInput}><Icon iconName="Add" />

                                    </div>
                            }
                        </div>
                        <div className="profile-details">
                            {empProps ?
                                <div className="profile-details-container">
                                    <div className="profile-details-name">
                                        <p>{empProps.fname} {empProps.lname}</p>
                                    </div>
                                    <p className="profile-details-position">{empProps.title}</p>
                                    <p className="profile-details-email">{empProps.emailad}</p>

                                </div>
                                :
                                <div className="profile-details-container">
                                    <div className="profile-details-name">
                                        <p>Unknown</p>
                                        <p>Unknown</p>
                                    </div>
                                    <p className="profile-details-position">Unknown</p>
                                    <p className="profile-details-email">Unknown</p>
                                </div>
                            }
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className={`emphub-body-columnb ms-Grid-col ms-sm12 ms-md8 ms-lg10 ${openLoader ? "loading" : ""}`}>
                    <div className="emphub-drop-loader" id="emphubloader">
                        <img src={"https://fpimagestorage.blob.core.windows.net/generalinformationassets/fploaderswhite.gif"} />
                    </div>
                    {
                        selectedMenu == "home" ?
                            <Details />
                            : selectedMenu == "LeaveManagement" ?
                                <LeaveManagement />
                                : selectedMenu == "ShiftManagement" ?
                                    <ShiftManagement />
                                    : selectedMenu == "Payslip" ?
                                        <Payslip />
                                        : selectedMenu == "PayrollInquiries" ?
                                            <PayrollInquiries />
                                            : selectedMenu == "Documents" ?
                                                <Documents />
                                                : selectedMenu == "Forms" ?
                                                    <Forms />
                                                    : ""
                    }
                </div>
            </div>
            {
                isLoading ?
                    <div className={`loader`}> <Spinner size={SpinnerSize.large} /></div>
                    : ""
            }
        </div>
    )
}

export default Home