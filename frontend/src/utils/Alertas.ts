import type { HttpErrorDTO } from "@shared/utils";
import type { SuccessData } from "@shared/utils";
import { notifications } from "@mantine/notifications";

function emitirNotificacao(response: HttpErrorDTO | SuccessData) {
  console.log(response);
  if("error" in response) {
    notifications.show({
      id: "notifyResponseResult",
      title: "Erro",
      message: response.error.message,
      color: "red",
      classNames: {description: "!text-slate-700"}
    })
  } else {
    notifications.show({
      id: "notifyResponseResult",
      title: "Sucesso",
      message: response.message,
      color: "green",
      classNames: {description: "!text-slate-700"}
    })
  }
}

export {emitirNotificacao};