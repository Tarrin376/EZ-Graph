import DetailsSidebarVideo from "../assets/details-sidebar.mp4";
import ComparisonAlgorithms from "../assets/comparison-algorithms.mp4";
import AddSecondGraph from "../assets/add-second-graph.mp4";

// Contains information for each tutorial page.
export const tutorialData = [
    {
        title: "Welcome to the tutorial!",
        text: "In this tutorial, you will learn how to use the application effectively. \
        This includes how to create a network, visualise it, and interact with the visualisation.\
        You can navigate through the tutorial using the back and forward buttons below.\
        You can also exit the tutorial at any time by clicking the X button in the top right corner.\
        If you have any questions, please email us at CurtisT1@cardiff.ac.uk.",
    },
    {
        title: "Creating a network (part 1)",
        text: "Click the 'Create a network' button in the sidebar or the 'Start visualising' button on the graph space.\
        This will open a pop-up window where you can enter the name of the network you want to create.\
        You will also be required to supply two files containing the nodes and edges in the network respectively. Please make sure you follow\
        the format provided above for both files and ensure that they are in the .csv file format. Also ensure that no whitespace is present at\
        the end of your files to prevent any warning messages. A video of creating a new network can be viewed on the next page to help you\
        get set up quickly.",
    },
    {
        title: "Creating a network (part 2)",
        text: "The top left of the network sidebar contains a button labelled 'Create a Network'.\
        Clicking this button will open a pop-up window that allows you to create a network.",
        videoLink: AddSecondGraph
    },
    {
        title: "Using the comparison algorithms to compare networks",
        text: "The left sidebar contains a list of algorithms, clicking on one of these will run the selected algorithm on all the networks\
        to allow you to effectively analyze and compare them. To understand more about the comparison algorithms, click the associated 'i' icon for the\
        algorithm that you want to learn more about. This will bring up a small popup that explains what the algorithm does at a high level.",
        videoLink: ComparisonAlgorithms
    },
    {
        title: "Understanding the colour coding of the nodes",
        text: "The nodes in the visualisation are coloured based on their relative importance.\
        At the bottom of the left sidebar, there is a dropdown list that contains each category of visualisation (view the image 'Centrality importance colours' for reference).\
        Clicking on a list item will show you what colours are being used for that particular type of comparison algorithm. Depending\
        on the comparison algorithm being run, a node may change size according to its assigned colour. The size demonstrates its importance within the network.\
        The larger the node's size, the more important it is to the network.",
    },
    {
        title: "Understanding the right sidebar",
        videoLink: DetailsSidebarVideo,
        text: "The right sidebar contains information about the currently selected network.\
        It contains a list of network statistic algorithms that give you more information about your selected network.\
        To run them, click on the 'run' button and the associated result will appear to the left of the button."
    },
];