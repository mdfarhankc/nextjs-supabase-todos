import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { TodoOptimisticUpdate } from "./todo-list";
import { useRef } from "react";
import { addTodo } from "@/app/todos/action";
import { Todo } from "@/types/custom";

function FormContent() {
  return (
    <>
      <Textarea
        minLength={4}
        name="todo"
        required
        placeholder="Add a new todo"
      />
      <Button type="submit" size="icon" className="min-w-10">
        <Send className="h-5 w-5" />
        <span className="sr-only">Submit Todo</span>
      </Button>
    </>
  );
}

export function TodoForm({
  optimisticUpdate,
}: {
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardContent className="p-3">
        <form
          ref={formRef}
          className="flex gap-4"
          action={async (data) => {
            const newTodo: Todo = {
              id: -1,
              inserted_at: "",
              user_id: "",
              task: data.get("todo") as string,
              is_complete: false,
            };
            optimisticUpdate({ action: "create", todo: newTodo });
            await addTodo(data);
            formRef.current?.reset();
          }}
        >
          <FormContent />
        </form>
      </CardContent>
    </Card>
  );
}
