import TreeNode from "../TreeNode"

const TreeView = ({ data }) => {

    if (!data)
        return <></>

    return (
        <>
            {data.map((node, index) => {
                return (<TreeNode key={index} data={node}></TreeNode>);
            })}
        </>
    );
};


export default TreeView;