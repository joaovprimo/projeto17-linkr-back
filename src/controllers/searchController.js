import { getNameByIdRepository, searchUserIdPostsRepository, searchUserIdUrlInfoRepository, searchAllUsersRepository, searchUsersFollowedRepository } from "../repositories/searchRepository.js";

const searchUser= async (req,res)=>{
    const {id}=req.params;
    const {search} = req.query;
    if(!search){
        return res.sendStatus(404);
    };
    try{
        const response = await searchAllUsersRepository(search);
        const AllFolloweds = await searchUsersFollowedRepository(id,search)
        const arrFollowed=[];
        const followeds=[];
        const separeteFollowed=[];
        const separeteUnfollowed=[];
        const newResponse=[];

        AllFolloweds.map((e)=>(
            arrFollowed.push(e.followedId)
        ));
        response.map((e)=>{
            if(arrFollowed.includes(e.id)){
                followeds.push(e.id);
            };
        });
        response.map((e)=>{
            if(followeds.includes(e.id)){
                separeteFollowed.push(e);
            }else{
                separeteUnfollowed.push(e);
            };
        });
        separeteFollowed.map((e)=>{
            newResponse.push(e);
        });
        separeteUnfollowed.map((e)=>{
            newResponse.push(e);
        });

        return res.send({users:newResponse,followed:followeds});
    }catch(err){
        return res.status(500).send(err.message);
    };
};

const searchAllUsers = async (req,res)=>{
    const {search} = req.query;
    if(!search){
        return res.sendStatus(404);
    };
    try{
        const response =  await searchAllUsersRepository(search);
        return res.send(response);
    }catch(err){
        return res.status(500).send(err.message);
    };
};

const searchUserId = async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    if(!id){
        res.sendStatus(404);
    };
    try{
        const posts = await searchUserIdPostsRepository(id);
        
        for (let i = 0; i < posts.length; i++) {
            const urlInfo = await searchUserIdUrlInfoRepository(posts,i)
            posts[i].urlInfo = urlInfo.rows[0];
          };
          
        return res.send(posts);
    }catch(err){
        return res.status(500).send(err);
    };
};

const getNameById=async(req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.sendStatus(404);
    };
    try{
        const name=await getNameByIdRepository(id);
        if(!name[0]){
            return res.sendStatus(404);
        };
        return res.send(name);
    }catch(err){
        return res.status(500).send(err);
    };
};


export {searchUser,searchUserId,getNameById,searchAllUsers}