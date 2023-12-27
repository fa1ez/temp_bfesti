// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

// ** Demo Components Imports
import { getBlogByID } from "src/Client/request";
import EditBlogValidationForm from "../../../views/forms/form-validation/EditArtistsValidationForm";

const AddNewBlog = () => {
  const [blog, setBlog] = useState();
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    getBlogByID(id).then((res: any) => {
      console.log("res", res);
      setBlog(res);
    });
  }, [id]);

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant="h5">
            <MuiLink>Edit Blog</MuiLink>
          </Typography>
        }
        subtitle={
          <Typography variant="body2">
            Specify what you want to appear in the blog
          </Typography>
        }
      />
      <Grid item xs={12}>
        <EditBlogValidationForm blog={blog} id={id} />
      </Grid>
    </Grid>
  );
};

export default AddNewBlog;
