import { useState } from "react";
import { Dialog } from "../../../components/ui/Dialog/Dialog";
import { INFORMATION_DIALOG, MAIN } from "../../../lang/texts";
import { LinkedInIcon } from "../../../components/ui/Icons/LinkedInIcon";
import { GitHubIcon } from "../../../components/ui/Icons/GitHubIcon";
import { Button } from "../../../components/ui/Button/Button";

export function InfoButton() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <Button onClick={() => setOpenDialog(true)}>{MAIN.moreInfo}</Button>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <h1>
                    {INFORMATION_DIALOG.title}
                    <img src="/icon.svg" width="30px" style={{ marginLeft: 20 }} />
                </h1>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                        rowGap: 20,
                    }}
                >
                    <p
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {INFORMATION_DIALOG.description}
                    </p>
                    <p>
                        <b style={{ marginRight: 10 }}>{INFORMATION_DIALOG.about}</b>
                        {INFORMATION_DIALOG.myself}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            columnGap: 10,
                        }}
                    >
                        <a
                            href="https://www.linkedin.com/in/octave-le-tullier"
                            target="_blank"
                        >
                            <LinkedInIcon />
                        </a>
                        <a href="https://github.com/OctaveLT" target="_blank">
                            <GitHubIcon />
                        </a>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
